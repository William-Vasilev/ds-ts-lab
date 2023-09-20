import {
    ColleagueV2,
    Friend,
    Buddy,
    BuddyList,
    Administrator,
  } from "./myTypes";
  import { friends } from "./01-basics";

  const friend1: Friend = {
    name: "Paul Fleming",
    phone: "087-12345",
    age: 25,
    dob: new Date("1998-11-20"),
  };
  
  const friend2: Friend = {
    name: "Jane Costello",
    phone: "086--12345",
    age: 31,
    interests: ['Music', 'Sport'],
  };

  const colleague1 : ColleagueV2 = {
    name: "Ralph Graham",
    department: "Engineering",
    contact: {
      email: "rgraham@company.com",
      extension: 121,
    },
  };
  
  const colleague2 : ColleagueV2 = {
    name: "Patti Burke",
    department: "Finance",
    contact: {
      email: "pburke@company.com",
      extension: 132,
    },
  };
  
  const colleague3 : ColleagueV2 = {
    name: "Dean Sullivan",
    department: "HR",
    contact: {
      email: "dos@company.com",
      extension: 125,
    },
  };


  function makeBuddyList(
    name: string,
    buddies: Buddy[],
    admin?: Administrator
  ): BuddyList {
    return {
      name,
      members: buddies,
      administrator: admin,
    } as BuddyList;
    // The as operator above casts an object to a specific type.
  }
  // Tests for makeBuddyList
  const myFootballBuddies = makeBuddyList(
    "Football team",
    [colleague1, friends[0], colleague2],
    colleague1
  )
  
  const myBandBuddies = makeBuddyList(
      "Band name",
      [colleague1, friends[1]]
      // No administrator
    )
  
  console.log(myFootballBuddies)
  console.log(myBandBuddies)
  //--------------------------------------
  function findBuddyContact(list: BuddyList, name: string): string | undefined {
    for (const buddy of list.members) {
      if (buddy.name === name) {
        if ("phone" in buddy) {
          return buddy.phone;
        }
        else {
          return buddy.contact.email;
        }
      }
      return undefined;
    }
  }
  // Test for findBuddyContact.
  console.log("Contact buddy at: ", findBuddyContact(myFootballBuddies, "Ralph Graham"));

  function getBuddyListFriends(list: BuddyList): Friend[] {
    //the reduce method filters and transforms the Buddy objects into Friend objects.
    const friends: Friend[] = list.members.reduce((accumulator: Friend[], buddy: Buddy) => {
      // Checks if the buddy is of type Friend (has 'phone' property).
      if ('phone' in buddy) {
        // Transform the Buddy object into a Friend object and add it to the accumulator.
        accumulator.push({
          name: buddy.name,
          phone: buddy.phone,
          dob: buddy.dob,
          age: buddy.age,
          interests: buddy.interests,
        });
      }
      return accumulator;
    }, []);
  
    return friends;
  }
  
  const myBuddyList: BuddyList = {
    name: "My Buddy List",
    administrator: "Admin",
    members: [friend1, friend2],
  };
  
  const friendList = getBuddyListFriends(myBuddyList);
  console.log(friendList);