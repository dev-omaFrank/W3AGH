export async function GET() {
  return Response.json({
    key: process.env.CHAINGPT_API_KEY || "NOT FOUND",
  });
}