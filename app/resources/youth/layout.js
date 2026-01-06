export const metadata = {
  title: "Learn About Youth Mental Health - MindBridge",
  description: "Learn about Youth Mental Health on MindBridge",
};

export default async function YouthLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}