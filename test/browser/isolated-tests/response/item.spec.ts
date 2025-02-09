import { Responses } from '../../../../lib';
import { getDeliveryClientWithJson, Movie } from '../../setup';
import * as warriorJson from '../fake-data/fake-warrior-response.json';

describe('Verifies mapping of delivery content item', () => {
    let response: Responses.IViewContentItemResponse<Movie>;

    beforeAll(async () => {
        response = (await getDeliveryClientWithJson(warriorJson).item<Movie>('x').toPromise()).data;
    });

    it(`checks system codename`, () => {
        expect(response.item.system.codename).toEqual(warriorJson.item.system.codename);
    });

    it(`checks system id`, () => {
        expect(response.item.system.id).toEqual(warriorJson.item.system.id);
    });

    it(`checks system type`, () => {
        expect(response.item.system.type).toEqual(warriorJson.item.system.type);
    });

    it(`checks system collection`, () => {
        expect(response.item.system.collection).toEqual(warriorJson.item.system.collection);
    });

    it(`checks last modified`, () => {
        expect(response.item.system.lastModified).toEqual(warriorJson.item.system.last_modified);
    });

    it(`checks workflow step`, () => {
        expect(response.item.system.workflowStep).toEqual(warriorJson.item.system.workflow_step);
    });

    it(`checks language`, () => {
        expect(response.item.system.language).toEqual(warriorJson.item.system.language);
    });

    it(`checks site map locations`, () => {
        const locations: string[] = ['main_sitemap'];
        expect(response.item.system.sitemapLocations).toEqual(locations);
    });

    it(`checks taxonomy element`, () => {
        expect(response.item.elements.releaseCategory.value[0].codename).toEqual(
            warriorJson.item.elements.releasecategory.value[0].codename
        );
    });

    it(`checks text element`, () => {
        expect(response.item.elements.title.value).toEqual(warriorJson.item.elements.title.value);
    });

    it(`checks datetime element`, () => {
        expect(response.item.elements.released.value).toEqual(warriorJson.item.elements.released.value);
    });

    it(`checks number element`, () => {
        expect(response.item.elements.length.value).toEqual(warriorJson.item.elements.length.value);
    });

    it(`checks assets element`, () => {
        expect(response.item.elements.poster.value.length).toEqual(warriorJson.item.elements.poster.value.length);
        expect(response.item.elements.poster.value[0].url).toEqual(warriorJson.item.elements.poster.value[0].url);
    });

    it(`checks that linked items are defined`, () => {
        expect(response.item.elements.stars).toBeDefined();
    });

    it(`checks that correct number of linked items are created`, () => {
        expect(response.item.elements.stars.linkedItems.length).toEqual(warriorJson.item.elements.stars.value.length);
    });

    it(`checks that text element in first linked item is set`, () => {
        expect(
            response.item.elements.stars.linkedItems.find(
                (m) =>
                    m.elements.firstName.value === warriorJson.modular_content.joel_edgerton.elements.first_name.value
            )
        ).toBeDefined();
    });

    it(`checks that text element in second linked item is set`, () => {
        expect(
            response.item.elements.stars.linkedItems.find(
                (m) => m.elements.firstName.value === warriorJson.modular_content.tom_hardy.elements.first_name.value
            )
        ).toBeDefined();
    });
});
