class LogManager {
  log(msg: string) {
    console.log(new Date(), msg);
  }
}

export default new LogManager();
