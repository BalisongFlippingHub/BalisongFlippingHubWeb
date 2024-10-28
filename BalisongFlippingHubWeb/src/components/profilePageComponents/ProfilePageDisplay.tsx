interface params {
  displayName: string;
  identifierCode: string;
}

const ProfilePageDisplay = ({ displayName, identifierCode }: params) => {
  return (
    <section className="w-full pt-[64px] lg:pl-[192px]">
      <h4>Display for profile</h4>
      <h4>{displayName}</h4>
      <h4>{identifierCode}</h4>
    </section>
  );
};

export default ProfilePageDisplay;
