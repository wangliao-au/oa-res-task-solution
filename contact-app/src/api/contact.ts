export interface Contact {
    id: number;
    name: string;
    username: string;
    email: string;
    street: string;
    suite: string;
    city: string;
    zip: string;
    lat: string;
    lng: string;
    phone: string;
    website: string;
    company: string;
}

export async function fetchContacts(): Promise<Contact[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }

        const data = await response.json();
        console.log(data);
        // Map the fetched data to the Contact interface, including only the desired fields.
        const contacts: Contact[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            street: item.address.street,
            suite: item.address.suite,
            city: item.address.city,
            zip: item.address.zipcode,
            lat: item.address.geo.lat,
            lng: item.address.geo.lng,
            phone: item.phone,
            website: item.website,
            company: item.company.name,
        }));

        return contacts;
    } catch (error: any) {
        throw new Error('Failed to fetch contacts: ' + error.message);
    }
}
