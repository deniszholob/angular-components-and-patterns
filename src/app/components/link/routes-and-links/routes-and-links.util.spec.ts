import { routeStringToLink } from './routes-and-links.util';

// File Level Tests
describe('Routes And Links Utilities', () => {
  // Function level tests
  describe('routeStringToLink', () => {
    it('should test routeStringToLink 1', () => {
      const result = routeStringToLink('test_route');
      expect(result).toEqual({ url: 'test_route', display: 'Test Route' });
    });

    it('should test routeStringToLink 2', () => {
      const result = routeStringToLink('');
      expect(result).toEqual({ url: '', display: '' });
    });

    it('should test routeStringToLink 3', () => {
      const result = routeStringToLink('/');
      expect(result).toEqual({ url: '/', display: '/' });
    });

    // it('should test routeStringToLink 4', () => {
    //   const result = routeStringToLink('/test_route');
    //   expect(result).toEqual({ url: '/test_route', display: 'Test Route' });
    // });

    // it('should test routeStringToLink 5', () => {
    //   const result = routeStringToLink('test_route/');
    //   expect(result).toEqual({ url: 'test_route/', display: 'Test Route' });
    // });

    // it('should test routeStringToLink 6', () => {
    //   const result = routeStringToLink('/test_route/');
    //   expect(result).toEqual({ url: '/test_route/', display: 'Test Route' });
    // });

    // it('should test routeStringToLink 7', () => {
    //   const result = routeStringToLink('/test_route/test_subroute');
    //   expect(result).toEqual({
    //     url: '/test_route/test_subroute',
    //     display: 'Test Subroute',
    //   });
    // });
  });
});
