import { SecureImageSrcPipe } from './secure-image-src.pipe';

describe('SecureImageSrcPipe', () => {
  it('create an instance', () => {
    const pipe = new SecureImageSrcPipe();
    expect(pipe).toBeTruthy();
  });
});
