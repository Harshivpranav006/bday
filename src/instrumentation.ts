export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    process.on("uncaughtException", (err) => {
      console.error("[bday] uncaughtException:", err);
    });
    process.on("unhandledRejection", (reason) => {
      console.error("[bday] unhandledRejection:", reason);
    });
  }
}
