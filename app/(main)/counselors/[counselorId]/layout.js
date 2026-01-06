export default function CounselorProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground">
            Counselors / Profile
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        {children}
      </main>
    </div>
  );
}