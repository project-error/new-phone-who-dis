import { FormattedProfile, Profile } from '../../../../../typings/match';

export const MockProfilesData: Profile[] = [
  {
    id: 1,
    identifier: '3r523242',
    viewed: false,
    image:
      'https://cdn.vox-cdn.com/thumbor/9xCALlkm2Mc0HQk8kMr1Ui3YNbc=/0x0:5464x3070/920x613/filters:focal(2295x1098:3169x1972):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67031748/shutterstock_1450403549.0.jpg',
    name: 'Evan You',
    bio: 'Husband, father of two, independent open source developer. Creator / project lead of @vuejs, @vite_js and connoisseur of sushi.',
    createdAt: 1615932985,
    updatedAt: 1615932985,
    lastActive: 1616004986,
    job: 'Gardener',
    location: 'Grapeseed',
    tags: 'shit framework, vue sucks',
    phoneNumber: '987-6543',
  },
  {
    id: 2,
    identifier: '3r523242',
    viewed: false,
    image:
      'https://media.cntraveler.com/photos/5f8f09c3a078e9112956774d/16:9/w_1600%2Cc_limit/Chicago-GettyImages-1065188752.jpg',
    name: 'Person Beta',
    bio: 'l impedit quo minus id quod maxime placeat facere possimus',
    createdAt: 1615846585,
    updatedAt: 1615846585,
    lastActive: 1615850185,
    job: 'Mechanic',
    location: 'Harmony',
    tags: 'tinkering,robotics',
    phoneNumber: '654-3219',
  },
  {
    id: 3,
    identifier: '3r523242',
    viewed: false,
    image: 'https://www.langan.com/wp-content/uploads/2019/02/Boston-996x554.jpg',
    name: 'Person Charlie',
    bio: 'ut aut reiciendis voluptatibus',
    createdAt: 1615850185,
    updatedAt: 1615850185,
    lastActive: 1613607385,
    job: 'Lawyer',
    location: 'Los Santos',
    tags: 'reading,coolstuff, coffee',
    phoneNumber: '123-4567',
  },
];

export const MockMyProfileData: FormattedProfile = {
  id: 4,
  identifier: '4785656',
  viewed: false,
  image:
    'https://www.middlebury.edu/institute/sites/www.middlebury.edu.institute/files/styles/1040x585/public/2018-10/Nashville-skyline.jpg?fv=mS11EKrT&itok=HNhHqYUX',
  name: 'Kire Says',
  bio: "Kire's cool profile that has many cool things. And others.",
  createdAt: 1615932985,
  updatedAt: 1615932985,
  lastActive: 1616004986,
  job: 'Engineer',
  location: 'Boston',
  tags: 'code,books',
  phoneNumber: '999-9999',
  tagList: ['reading', 'coolstuff', 'coffee'],
  lastActiveFormatted: '12332425',
};
