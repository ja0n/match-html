var matchHTML = require('../index');

it("doesn't care for blank lines", function() {
  const expected = "<!DOCTYPE html>\n"
  const given = '<!DOCTYPE html>'

  expect(matchHTML(expected, given)).toEqual(true);
});

it("knows how to handle comments", function() {
  const expected = "<!DOCTYPE html>\n<!-- Isso é um comentário -->"
  const given = '<!DOCTYPE html>'

  expect(matchHTML(expected, given)).toEqual(true);
});
