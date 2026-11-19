export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">

      <div className="max-w-md text-center">

        <h1 className="text-2xl font-bold text-gray-900">
          Shop not found
        </h1>

        <p className="mt-3 text-gray-600">
          No shop is set up for this address. Open a shop through its own
          subdomain, for example{" "}
          <code className="rounded bg-gray-200 px-1">ananya.localhost:3000</code>{" "}
          or{" "}
          <code className="rounded bg-gray-200 px-1">kiran.localhost:3000</code>.
        </p>

      </div>

    </main>
  );
}
