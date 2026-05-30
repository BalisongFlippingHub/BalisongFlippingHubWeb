const ProductWorldPage = () => {
  return (
    <section
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #3d0000 0%, #1a0000 50%, #0d0000 100%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </section>
  );
};

export default ProductWorldPage;
