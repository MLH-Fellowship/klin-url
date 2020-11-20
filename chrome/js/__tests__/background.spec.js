import { getCurrentTabUrl } from "../code/background"


//the describe keyword wraps a set of related tests: test suite
describe("Grab tab url function", () => {
    test("it should return the url of the browser's active tab", () => {
        expect(getCurrentTabUrl()).toEqual("");
    });
});