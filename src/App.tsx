import { useTickets } from "./utils/hooks/useTickets.tsx";
import { useForm } from "react-hook-form";
import {
  ClipboardDocumentCheckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ErrorMessage } from "./components/ErrorMessage.tsx";

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
      <div className="flex max-w-full basis-full flex-col gap-4 bg-slate-600 p-4 md:max-w-3xl">
        <div className={`flex flex-col ${tickets.length ? "gap-4" : ""}`}>
          <label htmlFor="ticket-numbers" className="sr-only">
            Ticket Numbers
          </label>
          <input
            {...register("ticket-numbers")}
            type="text"
            className="basis-full p-2"
            placeholder="Ticket Number (optional): ABC-123, XYZ-789"
            onKeyUp={(e) => handleKeyUp(e)}
          />
          <ul className="flex gap-1">
            {tickets.map(({ id, title }) => (
              <li key={id} className="flex gap-0.5 rounded-md bg-slate-400 p-1">
                <span>{title}</span>
                <button aria-label="Close" onClick={removeTicket(id)}>
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
            className="basis-2/12 p-2 md:overflow-hidden"
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
            className="basis-10/12 p-2"
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
            className="basis-full p-2"
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
            className="basis-full resize-none p-2"
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
            className="basis-full resize-none p-2"
            placeholder="Footer (optional): breaking changes, closed issues, etc."
          ></textarea>
        </div>

        {isValid ? (
          <div className="flex flex-col bg-blue-200 p-2">
            <p>Commit Message</p>
            <div>
              <p>
                {`${watch("type")}${
                  watch("scope") ? `(${watch("scope")})` : ""
                }:${watch("subject")}`}
                {watch("body") && (
                  <>
                    <br />
                    {watch("body")}
                  </>
                )}
                {watch("footer") && (
                  <>
                    <br />
                    {watch("footer")}
                  </>
                )}
              </p>
              <button
                className="inline-flex max-w-fit gap-2 rounded-lg bg-slate-500 p-2"
                onClick={copyToClipboard}
              >
                <p>Copy to Clipboard</p>
                <ClipboardDocumentCheckIcon className="h-6 w-6" />
              </button>
            </div>
            <button className="inline-flex">Copy to Clipboard</button>
          </div>
        ) : (
          <ErrorMessage subject={watch("subject")} type={watch("type")} />
        )}
      </div>
    </div>
  );
}

export default App;
