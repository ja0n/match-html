var matchHTML = require('../index');

it("should respond with hello world", function() {
  const given = '<!DOCTYPE html>'
  const expected = "<!DOCTYPE html>\n"
  expect(matchHTML(expected, given)).toEqual(true);
});
