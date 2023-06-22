function App() {
  return (
    <div className="mx-auto my-0 flex max-w-7xl justify-center p-8 text-black">
      <div className="flex max-w-3xl basis-full flex-col gap-4 bg-slate-600 p-4">
        <div className="flex">
          <label htmlFor="ticket-numbers" className="sr-only">
            Ticket Numbers
          </label>
          <input
            type="text"
            id="ticket-numbers"
            className="basis-full p-2"
            placeholder="Ticket Number (optional): ABC-123, XYZ-789"
          />
          <ul></ul>
        </div>

        <div className="flex gap-4">
          <label htmlFor="type" className="sr-only" />
          <select
            name="type"
            id="type"
            className="basis-2/12 overflow-hidden p-2"
          >
            <option value="type" disabled selected>
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
            placeholder="Body"
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
            placeholder="Footer"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
