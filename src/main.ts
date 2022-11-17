import "https://deno.land/std@0.136.0/dotenv/load.ts";

import { sendMassMail } from "./sendMail.ts";
// TODO Pass as argument(?), this is a workaround to avoid exposure of addresses (tos.ts is gitignored)
import { tos } from "./tos.ts";

await sendMassMail(tos, "Anfrage", "Ein Text");
