import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Home() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <div className="fixed py-7 px-16 flex flex-row items-center justify-end">
        <NotificationsIcon />
      </div>
    </main>
  );
}
