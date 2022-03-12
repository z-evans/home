export default new (class OnInputHandler {
  enter(e: React.KeyboardEvent<HTMLInputElement>, run: () => void): void {
    if (e.key === "Enter") {
      run();
    }
  }
})();
