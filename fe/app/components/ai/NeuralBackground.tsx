export default function NeuralBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] bg-cyan-500/10 blur-[160px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] bg-purple-500/10 blur-[200px]" />

      <div className="absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.03)_100%)] bg-[size:100%_6px]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
    </div>
  );
}
