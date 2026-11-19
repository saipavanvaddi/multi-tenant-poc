
interface Props {
  shopName: string;
  brandColor: string;
}

export default function Header({
  shopName,
  brandColor,
}: Props) {
  return (
    <header
      style={{ backgroundColor: brandColor }}
      className="px-6 py-5 text-white shadow"
    >
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold">
          {shopName}
        </h1>

        <p className="text-sm opacity-90">
          Welcome to our store
        </p>
      </div>
    </header>
  );
}
