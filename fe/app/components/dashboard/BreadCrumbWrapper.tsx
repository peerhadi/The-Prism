"use client";

import Breadcrumbs from "@/app/components/Breadcrumb";

export default function BreadcrumbWrapper({ items }: { items: { label: string; href: string }[] }) {
  return <Breadcrumbs items={items} />;
}
