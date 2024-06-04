import ProfilesTable from "@/components/ProfilesTable";

export default function Profiles() {
  return (
    <section className='py-24'>
      <div className='container'>
        <ProfilesTable />
      </div>
    </section>
  );
}
/*export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}
*/