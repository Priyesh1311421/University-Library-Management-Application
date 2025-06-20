import { serve } from "@upstash/workflow/nextjs";
import { prisma } from "@/databases/db";
import { sendEmail } from "@/lib/workflow";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { lastActivityDate: true },
  });

  if (!user || !user.lastActivityDate) return "non-active";

  const lastActivityDate = new Date(user.lastActivityDate);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference <= THIRTY_DAYS_IN_MS) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Send welcome email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to the platform",
      message: `Welcome ${fullName}! Thank you for signing up!`,
    });
  });

  // Wait for 3 days
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3); // 3 days

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Are you still there?",
          message: `Hey ${fullName}, we miss you!`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back!",
          message: `Welcome back ${fullName}!`,
        });
      });
    }

    // Wait for 1 month before checking again
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
