export const metadata = {
  title: "Find Counselors - MindBridge",
  description: "Browse and book appointments with top wellness counselors",
};

export default async function CounselorsLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}