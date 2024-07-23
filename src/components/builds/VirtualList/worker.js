/* eslint-disable no-restricted-globals */
import { faker } from "@faker-js/faker";


  self.onmessage = () => {
    const data = Array.from({ length: 50000 }).map((v, i) => ({
      id: `id_${i}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }));
    self.postMessage(data);
  };