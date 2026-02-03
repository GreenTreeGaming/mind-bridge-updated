export const metadata = {
  title: "Learn About Stress & Burnout - MindBridge",
  description: "Learn about Stress & Burnout Disorders on MindBridge",
};

export default async function StressLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}