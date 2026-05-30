const CommunityPage = () => {
  return (
    <section
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #0c2d35 0%, #061a1f 50%, #030d11 100%)',
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </section>
  );
};

export default CommunityPage;
