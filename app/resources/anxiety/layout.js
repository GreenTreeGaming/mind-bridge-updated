export const metadata = {
  title: "Learn About Anxiety - MindBridge",
  description: "Learn about Anxiety Disorders on MindBridge",
};

export default async function AnxietyLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}