export const metadata = {
  title: "Learn About Depression - MindBridge",
  description: "Learn about Depression Disorders on MindBridge",
};

export default async function DepressionLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}