import { Mount } from '../domain/model/mount';

describe('Mount', () => {
    let mount: Mount;

    beforeEach(() => {
        mount = new Mount({
            name: 'Dragon',
            speed: 80
        });
    });

    it('should create a mount with correct properties', () => {
        expect(mount.name).toBe('Dragon');
        expect(mount.speed).toBe(80);
    });

    it('should allow updating mount name', () => {
        mount.name = 'Griffin';
        expect(mount.name).toBe('Griffin');
    });

    it('should allow updating mount speed', () => {
        mount.speed = 100;
        expect(mount.speed).toBe(100);
    });

    it('should return correct speed', () => {
        expect(mount.speed).toBe(80);
    });
});
