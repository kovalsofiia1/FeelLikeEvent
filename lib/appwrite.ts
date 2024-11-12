import { Client, Account, ID, Models } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.event.for.you',
    projectId: '6733a4c4003a5869773f',
    databaseId: '6733bd81000733fc3efe',
    usersCollectionId: '6733bdea0001c07d1b62',
    eventsCollectionId: '6733be0c00090384ce5f',
    storageId: '6733c03e002720e5f635'
}

let client: Client;
let account: Account;


client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)   // Your Project ID
    .setPlatform(appwriteConfig.platform);   // Your package name / bundle identifier

account = new Account(client);

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response)
        })
        .catch(function (response) {
            console.log(response)
        })
}