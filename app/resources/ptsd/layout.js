export const metadata = {
  title: "Learn About PTSD - MindBridge",
  description: "Learn about PTSD on MindBridge",
};

export default async function PTSDLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}