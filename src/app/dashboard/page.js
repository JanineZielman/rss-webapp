export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FeedForward Dashboard</h1>
      <form className="flex flex-col space-y-2">
        <input type="text" placeholder="Feed URL" className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2">Add Feed</button>
      </form>
    </div>
  );
}
