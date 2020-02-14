import { expect } from 'chai';
import AppToolset from '../src/3-ToolsetFactory/types/AppToolset';
import ToolsetFactory from '../src/3-ToolsetFactory/ToolsetFactory';
import AuthSubscriber from '../src/1-AuthManager/interfaces/AuthSubscriber';
import ApiResponse from '../src/0-ApiLibrary/types/ApiResponse';

describe.skip('Toolset factory', function()
{
    let toolset: AppToolset
    let responseStatus
    const dummySubscriber: AuthSubscriber =
    {

        notify(response: ApiResponse)
        {
            responseStatus = response.status;
            expect(responseStatus).to.equal(200);
        }
    }

    it('Instantiates database and manager', async function()
    {
        toolset = await ToolsetFactory.makeToolset();
        expect(toolset.authManager).to.not.equal(undefined);
        expect(toolset.userStorage).to.not.equal(undefined);
    });

    it('\'s manager make requisitions', function()
    {
        toolset.authManager.subscribe(dummySubscriber);
        toolset.authManager.login({
            email: 'teste@unitario.com',
            password: 'Teste@123'
        });
    });
});