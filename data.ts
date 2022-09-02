type House = {
    id: number;
    address: string;
    type: string;
    residentId: number;
}

type Resident = {
    id: number;
    name: string;
    age: number;
    gender: string
}

export const houseData:House[] = [
    {
        id:1,
        address: "St.Dibra",
        type:"Flat",
        residentId:2
    },
    {
        id:2,
        address:"St.Sala",
        type:"House",
        residentId:1
    },
    {
        id:3,
        address:"St.Kodra e Diellit",
        type:"Farm",
        residentId:1
    },
    {
        id:4,
        address:"St.Tufina",
        type:"Farm",
        residentId:3
    },
    {
        id:5,
        address:"St.Komuna e Parisit",
        type:"House",
        residentId:2
    }
]




export const residentData:Resident[] = [
    {
        id:1,
        name:"Andre",
        age:55,
        gender:"male"
    },
    {
        id:2,
        name:"Erotida",
        age:35,
        gender:"female"
    },
    {
        id:3,
        name:"Tea",
        age:23,
        gender:"female"
    }
]


