import "https://deno.land/std@0.136.0/dotenv/load.ts";

import { sendMassMail } from "./sendMail.ts";

// TODO Pass as arguments(?), this is a workaround to avoid exposure of addresses (files are gitignored)
import { subject } from "./input/subject.ts";
import { text } from "./input/text.ts";
import { tos } from "./input/tos.ts";

const tosArray = Array.from(new Set(tos.split("\n"))).filter(to => to !== "");

await sendMassMail(tosArray, subject, text);
