
/*
type Tag = {
    isBrand?: boolean;
    isEnvironment?: boolean;
    key: string;
}
*/
function _it(name, tags, fn, only) {
    if (!isAllowedToRun(tags)) {
        return;
    }

    const itFn = only ? it.only : it;

    itFn (name, () => {
        fn();
    });
}

function runsOnBrand(tags) {
    const brands = tags
      .map(x => x.key.toLowerCase());
    const brand = Cypress.env("BRAND").toLowerCase();
  
    return brands.length === 0 || brands.some(x => x === brand);
  }
  
  function runsInEnvironment(tags) {
    const environments = tags
      .map(x => x.key.toLowerCase());
    const env = Cypress.env("ENV").toLowerCase();
  
    return environments.length === 0 || environments.some(x => x === env);
  }
  

function isAllowedToRun(tags) {
    const brand = Cypress.env("BRAND").toLowerCase();
    const env = Cypress.env("ENV").toLowerCase();
    const bothRestrictions = tags.filter(x => x.isBrand && x.isEnvironment);
    const otherRestrictions = tags.filter(x =>
        bothRestrictions.indexOf(x) <= -1 && (x.isEnvironment || x.isBrand));

    const runBrand = runsOnBrand(otherRestrictions.filter(x => x.isBrand && !x.isEnvironment));
    const runEnv = runsInEnvironment(otherRestrictions.filter(x => x.isEnvironment && !x.isBrand));
    const both = tags.some(x => x.isBrand && x.isEnvironment && x.key.toLowerCase() === `${brand}|${env}`);

    if (bothRestrictions.length > 0 && otherRestrictions.length === 0) {
        return both;
    } else if (otherRestrictions.length > 0) {
        return runBrand && runEnv || both;
    } else {
        return true;
    }
}

describe("tags", () => {
    _it("sollte nicht laufen", [{ isBrand: true, key: "test" }, { deactivateEs: true }], () => {
        assert.isTrue(true);
    })
    _it("sollte laufen", [{ isBrand: true, key: "otherbrand" }], () => {
        assert.isTrue(true);
    })
    _it("sollte nicht laufen", [{ isEnvironment: true, key: "hotfix" }], () => {
        assert.isTrue(true);
    })
    _it("sollte laufen", [{ isEnvironment: true, key: "release" }], () => {
        assert.isTrue(true);
    })
})