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
            className="basis-full"
            placeholder="Ticket Number (optional): ABC-123, XYZ-789"
          />
          <ul></ul>
        </div>

        <div className="flex gap-4">
          <select name="type" id="type" className="basis-2/12">
            <label htmlFor="type" className="sr-only" />
            <option value="type" disabled selected>
              type
            </option>
            <option value="feat">feat</option>
          </select>
          <label htmlFor="scope" className="sr-only">
            Scope
          </label>
          <input
            type="text"
            id="scope"
            className="basis-10/12"
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
            className="basis-full resize-none"
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
            className="basis-full resize-none"
            placeholder="Footer"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
