import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "@/lib/toast/toast";

import { User, Edit3, X } from "lucide-react";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

async function cropImage(
  image: HTMLImageElement,
  crop: PixelCrop,
): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas not supported");
  }

  canvas.width = 512;
  canvas.height = 512;

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, 512, 512);

  return canvas.toDataURL("image/jpeg", 0.95);
}

function CropModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[99998] bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl rounded-3xl border border-white/10 bg-[var(--background)] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}

export default function ProfileImagePicker({ id, profileImageUrl }: { id: number; profileImageUrl?: string }) {
  console.log(profileImageUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [avatar, setAvatar] = useState<string | null>(profileImageUrl ?? null);

  const [modalOpen, setModalOpen] = useState(false);

  const [sourceImage, setSourceImage] = useState("");

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setSourceImage(reader.result as string);
      setModalOpen(true);
    };

    reader.readAsDataURL(file);
  };

  const saveCrop = async () => {
    if (!imageRef.current || !completedCrop) {
      return;
    }

    try {
      const cropped = await cropImage(imageRef.current, completedCrop);

      const blob = await (await fetch(cropped)).blob();

      const formData = new FormData();
      formData.append("file", blob, "avatar.jpg");

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        {
          method: "POST",
          headers: {
            Authorization: window.localStorage.getItem("token") ?? "",
          },
          body: formData,
        },
      );

      const uploadData = await uploadRes.json().catch(() => null);

      if (!uploadRes.ok) {
        throw new Error(uploadData?.message || "Failed to upload image");
      }

      const { imageUrl } = uploadData;

      const updateRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
          body: JSON.stringify({
            profileImageUrl: imageUrl,
          }),
        },
      );

      const updateData = await updateRes.json().catch(() => null);

      if (!updateRes.ok) {
        throw new Error(updateData?.message || "Failed to update avatar");
      }

      toast.success("Profile picture updated successfully", "Success");

      setAvatar(cropped);
      setModalOpen(false);

      window.location.reload();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile picture",
        "Update Failed",
      );
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleFile(file);
          }
        }}
      />

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-24 w-24 text-cyan-400" />
            )}
          </div>

          <button
            onClick={openPicker}
            className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/30 bg-black/80 transition hover:bg-black"
          >
            <Edit3 className="h-4 w-4 text-cyan-400" />
          </button>
        </div>

        <p className="mt-6 text-sm text-white/40">Upload profile image</p>
      </div>

      {/* Crop Modal */}
      <CropModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="border-b border-[var(--text-primary)] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Crop Profile Image
            </h2>

            <button
              onClick={() => setModalOpen(false)}
              className="rounded-lg p-2 transition hover:bg-white/10"
            >
              <X className="h-5 w-5 text-[var(--text-primary)]" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
              keepSelection
            >
              <img
                ref={imageRef}
                src={sourceImage}
                alt="Crop"
                className="max-h-[70vh] max-w-full rounded-xl"
                onLoad={(e) => {
                  const { width, height } = e.currentTarget;

                  setCrop(centerAspectCrop(width, height, 1));
                }}
              />
            </ReactCrop>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-xl border-2 border-[var(--border)] px-5 py-2 text-[var(--text-primary)] transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              onClick={saveCrop}
              className="rounded-xl bg-cyan-500 px-5 py-2 font-medium text-black transition hover:opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      </CropModal>
    </>
  );
}
