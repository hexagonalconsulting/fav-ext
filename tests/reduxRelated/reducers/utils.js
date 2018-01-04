// in execution time the tab info will be added to the action data by react-chrome-redux logic,
// here we are just doing a minimal emulation of it.
export function addTabInfoToAction(action) {
  return {
    ...action,
    ...{
      _sender: {
        tab: {
          id: 1
        }
      }
    }
  }
}