export function openSelect2(containerLocator, searchTerm) {
    return cy.log(`try to get: ${containerLocator}`)
        .get(containerLocator, { log: false }).should($eArray => {
            expect($eArray.length).to.be.greaterThan(0);

            const $e = $eArray[0];
            const existingSelect2Instance = Object.keys($e)
                .filter(x => x.indexOf("jQuery") > -1)
                .map(x => $e[x])
                .filter(x => x.select2 && x.select2.open);

            expect(existingSelect2Instance, "select2 should exist").to.have.length(1);
            const s2 = existingSelect2Instance[0].select2;
            s2.open();

            const amount = Cypress.$("#select2-drop li.select2-result-selectable").length;
            expect(amount).to.be.greaterThan(0, "there must be at least one result in the dropdown");

            let results = s2.opts.data.filter ? s2.opts.data : s2.opts.data().results;
            // search in parent and childs
            results = flattenCategories(results);
            const dataArr = results.filter(x => !x.disabled && x.label.indexOf(searchTerm) > -1);
            expect(dataArr).length.to.be.greaterThan(0, "there must be at least one selectable result after filtering");
            const data = dataArr[0];

            s2.val(data.id || data.value, true);
            s2.close();
        });
}

function flattenCategories(data) {
    const result = [];

    if (data && data.length > 0) {
        result.push(...data);
        data.forEach(n => result.push(...flattenCategories(n.children)));
    }

    return result;
}
