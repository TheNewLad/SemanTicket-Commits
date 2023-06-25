import { useTickets } from "./utils/hooks/useTickets.tsx";
import { useForm } from "react-hook-form";

function App() {
  const { register, resetField } = useForm();
  const { tickets, addTickets, removeTicket } = useTickets();

  const handleKeyUp = ({
    key,
    currentTarget: { value },
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      addTickets(value);
      resetField("ticket-numbers");
    }
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <label htmlFor="type" className="sr-only" />
          <select
            name="type"
            id="type"
            className="basis-2/12 p-2 md:overflow-hidden"
            defaultValue="type"
          >
            <option value="type" disabled>
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
            type="text"
            id="scope"
            className="basis-10/12 p-2"
            placeholder="Scope"
            required
          />
        </div>

        <div className="flex">
          <label htmlFor="body" className="sr-only">
            Body
          </label>
          <textarea
            name="body"
            id="body"
            className="basis-full resize-none p-2"
            placeholder="Body (optional)"
          ></textarea>
        </div>

        <div className="flex">
          <label htmlFor="footer" className="sr-only">
            Footer
          </label>
          <textarea
            name="footer"
            id="footer"
            className="basis-full resize-none p-2"
            placeholder="Footer (optional)"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
