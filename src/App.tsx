import { useTickets } from "./utils/hooks/useTickets.tsx";
import { useForm } from "react-hook-form";
import {
  ClipboardDocumentCheckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ErrorMessage } from "./components/ErrorMessage.tsx";
import { formatTickets } from "./utils/formatTickets.ts";

function App() {
  const {
    register,
    resetField,
    watch,
    formState: { isValid },
  } = useForm();
  const { tickets, addTickets, removeTicket } = useTickets();

  // TODO: move to useTickets
  const handleKeyUp = ({
    key,
    currentTarget: { value },
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      addTickets(value);
      resetField("ticket-numbers");
    }
  };

  const copyToClipboard = () => {
    const commitMessage = document.getElementById("commit-message")?.innerText;
    if (!commitMessage) return;
    navigator.clipboard.writeText(commitMessage);
  };

  return (
    <div className="mx-auto my-0 flex max-w-7xl justify-center p-8 text-black">
      <div className="flex max-w-full basis-full flex-col gap-4 rounded-md border-2 border-gray-200 p-4 md:max-w-3xl">
        <div className={`flex flex-col ${tickets.length ? "gap-4" : ""}`}>
          <label htmlFor="ticket-numbers" className="sr-only">
            Ticket Numbers
          </label>
          <input
            {...register("ticket-numbers")}
            type="text"
            className="basis-full rounded-md border-2 border-gray-200 bg-transparent p-2 text-gray-200 transition hover:border-blue-200 focus:bg-gray-200 focus:text-black"
            placeholder="Ticket Number (optional): ABC-123, XYZ-789"
            onKeyUp={(e) => handleKeyUp(e)}
          />
          <ul className="flex flex-wrap gap-1">
            {tickets.map(({ id, title }) => (
              <li key={id} className="flex gap-2">
                <button
                  aria-label="Close"
                  onClick={removeTicket(id)}
                  className="inline-flex gap-0.5 rounded-md border-2 border-blue-200 p-1 text-blue-200 transition hover:border-red-300 hover:text-red-300"
                >
                  <span>{title}</span>
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <label htmlFor="type" className="sr-only" />
          <select
            {...register("type", { required: "Type is required." })}
            name="type"
            id="type"
            className="basis-2/12 rounded-md border-2 border-gray-200 bg-transparent p-2 text-gray-200 transition hover:border-blue-200 focus:bg-gray-200 focus:text-black md:overflow-hidden"
            defaultValue=""
          >
            <option value="" disabled>
              type
            </option>
            <option value="build">
              build (build system or external dependencies changes)
            </option>
            <option value="ci">
              ci (CI configurations and scripts changes)
            </option>
            <option value="docs">docs (documentation)</option>
            <option value="feat">feat (feature)</option>
            <option value="fix">fix (bug fix)</option>
            <option value="perf">perf (improves performance)</option>
            <option value="refactor">
              refactor (neither fixes a bug nor adds a feature)
            </option>
            <option value="revert">revert (reverts a previous commit)</option>
            <option value="style">
              style (formatting, missing semi-colons, etc.)
            </option>
            <option value="test">test (adding missing tests)</option>
          </select>
          <label htmlFor="scope" className="sr-only">
            Scope
          </label>
          <input
            {...register("scope")}
            type="text"
            id="scope"
            className="basis-10/12 rounded-md border-2 border-gray-200 bg-transparent p-2 text-gray-200 transition hover:border-blue-200 focus:bg-gray-200 focus:text-black"
            placeholder="Scope (optional): component name, file name, etc."
          />
        </div>

        <div className={`gap-4} flex flex-col`}>
          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <input
            {...register("subject", { required: true })}
            type="text"
            className="basis-full rounded-md border-2 border-gray-200 bg-transparent p-2 text-gray-200 transition hover:border-blue-200 focus:bg-gray-200 focus:text-black"
            placeholder="Subject: short description of the change"
          />
        </div>

        <div className="flex">
          <label htmlFor="body" className="sr-only">
            Body
          </label>
          <textarea
            {...register("body")}
            name="body"
            id="body"
            className="basis-full resize-none rounded-md border-2 border-gray-200 bg-transparent p-2 text-gray-200 transition hover:border-blue-200 focus:bg-gray-200 focus:text-black"
            placeholder="Body (optional): longer description of the change"
          ></textarea>
        </div>

        <div className="flex">
          <label htmlFor="footer" className="sr-only">
            Footer
          </label>
          <textarea
            {...register("footer")}
            name="footer"
            id="footer"
            className="basis-full resize-none rounded-md border-2 border-gray-200 bg-transparent p-2 text-gray-200 transition hover:border-blue-200 focus:bg-gray-200 focus:text-black"
            placeholder="Footer (optional): breaking changes, closed issues, etc."
          ></textarea>
        </div>

        {isValid ? (
          <>
            <div className="flex flex-col gap-3 rounded-lg border-2 border-blue-200 p-4">
              <p className="text-xl text-blue-200">Commit Message</p>
              <div
                id="commit-message"
                className="rounded-lg border-2 border-blue-200 p-4 text-blue-200"
              >
                <p>
                  {`${watch("type")}${
                    watch("scope") ? `(${watch("scope")})` : ""
                  }: ${watch("subject")}${
                    tickets.length ? ` ${formatTickets(tickets)}` : ""
                  }`}
                </p>
                {watch("body") && <p>{watch("body")}</p>}
                {watch("footer") && <p>{watch("footer")}</p>}
              </div>
              <button
                className="inline-flex max-w-fit gap-2 rounded-lg border-2 border-blue-200 p-2 text-blue-200 transition hover:border-green-200 hover:text-green-200"
                onClick={copyToClipboard}
              >
                <p>Copy to Clipboard</p>
                <ClipboardDocumentCheckIcon className="h-6 w-6" />
              </button>
            </div>
          </>
        ) : (
          <ErrorMessage subject={watch("subject")} type={watch("type")} />
        )}
      </div>
    </div>
  );
}

export default App;
