export default function PublicFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto py-6 text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Arkanica. All rights reserved.
        </p>
      </div>
    </footer>
  )
}