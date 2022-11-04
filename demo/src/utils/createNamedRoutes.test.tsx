import { createNamedRoutes } from "./createNamedRoutes";
import { namedRoutes, routes } from "./createNamedRoutes.mocks";

describe("createNamedRoutes", () => {
  it("creates expected named routes", () => {
    const result = createNamedRoutes(routes);
    expect(result).toEqual(namedRoutes);
  });
});
