import { ContentItemsResponse } from '../../lib';
import { cmTestClient } from '../setup';

describe('List content items', () => {

    let response: ContentItemsResponse;

    beforeAll((done) => {
        cmTestClient.listContentItems()
            .getObservable()
            .subscribe(result => {
                response = result;
                done();
            });
    });

    it(`response should be instance of ContentItemsResponse class`, () => {
        expect(response).toEqual(jasmine.any(ContentItemsResponse));
    });

    it(`response should contain debug data`, () => {
        expect(response.debug).toBeDefined();
    });

    it(`response should contain data`, () => {
        expect(response.data).toBeDefined();
        expect(response.data.pagination).toBeDefined();
    });

    it(`item properties should be mapped`, () => {
        expect(response.data.items).toBeDefined();
        expect(Array.isArray(response.data.items)).toBeTruthy();
        expect(response.data.items.length).toBeGreaterThan(0);

        response.data.items.forEach(m => {
            expect(m.codename).toBeDefined();
            expect(m.id).toBeDefined();
            expect(m.last_modified).toBeDefined();
            expect(m.name).toBeDefined();
            expect(m.type).toBeDefined();
            expect(m.sitemap_locations).toBeDefined();
            expect(m.type.id).toBeDefined();
        });
    });


});
