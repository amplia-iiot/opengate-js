import { describe, it, expect } from 'vitest';

import NotebookScheduler from '../../../src/notebookScheduler/NotebookScheduler';

const ogapi = { Napi: { _options: { timeout: 5000 } } };

describe('NotebookScheduler.withTimezone', () => {
    it('sends the timezone when it is set', () => {
        const scheduler = new NotebookScheduler(ogapi).withNotebookId('nb').withTimezone('Europe/Madrid');
        expect(scheduler._composeElement().timeZone).toBe('Europe/Madrid');
    });

    it('leaves the timezone out when it is not set', () => {
        const scheduler = new NotebookScheduler(ogapi).withNotebookId('nb');
        expect(scheduler._composeElement()).not.toHaveProperty('timeZone');
    });

    it('rejects a timezone that is not a string', () => {
        expect(() => new NotebookScheduler(ogapi).withTimezone(1)).toThrow();
    });
});
