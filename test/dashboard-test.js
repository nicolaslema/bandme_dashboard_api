const expect = require('chai').expect
const {connectDB} = require('../app/config/db');
const Server = require('../app/config/server')
const dashboardService = require('../app/services/dashboard.service');


describe('findPosteoByType success', () => {
    it("find Posteo By Type success", async () => {
        const server = new Server();
        server.listen();
        const result = await dashboardService.findPosteByType("637ed93275978ac8767a3748", "advertising")
        expect(result.data).to.not.equal(null)
    })
});

describe('findPosteoByType error', () => {
    it("find Posteo By Type error", async () => {
        const result = await dashboardService.findPosteByType("", "")
        expect(result.size).to.equal(0)
    })
});


describe('validateFriend success', () => {
    it("validate Friend success", async () => {
        const result = await dashboardService.validateFriend("637ed93275978ac8767a3748", "1234")
        expect(result.data).to.not.equal(null)
    })
});

describe('validateFriend error', () => {
    it("validate Friend error", async () => {
        const result = await dashboardService.validateFriend("", "")
        expect(result.data).to.equal(null)
    })
});


describe('getPosteoById success', () => {
    it("get Posteo By Id success", async () => {
        const result = await dashboardService.getPosteoById("63793b46f7cdb8295eaef98d")
        expect(result.exist).to.equal(true)
    })
});

describe('getPosteoById error', () => {
    it("get Posteo By Id error", async () => {
        const result = await dashboardService.getPosteoById("1234")
        expect(result.exist).to.equal(false)
    })
});

describe('likePost success', () => {
    it("like Post success", async () => {
        const result = await dashboardService.likePost("63793b46f7cdb8295eaef98d", "637ed93275978ac8767a3748")
        expect(result.exist).to.equal(true)
    })
});

describe('likePost error', () => {
    it("like Post error", async () => {
        const result = await dashboardService.likePost("", "")
        expect(result.exist).to.equal(false)
    })
});

describe('getFriendsPostList success', () => {
    it("get Friends Post List success", async () => {
        const result = await dashboardService.getFriendsPostList("63793b46f7cdb8295eaef98d")
        expect(result.exist).to.equal(false)
    })
});

describe('getFriendsPostList error', () => {
    it("get Friends Post List error", async () => {
        const result = await dashboardService.getFriendsPostList("")
        expect(result.data).to.equal(null)
    })
});

describe('findPosteosByType success', () => {
    it("find Posteos By Type success", async () => {
        const result = await dashboardService.findPosteosByType("637ed93275978ac8767a3748", "advertising", "ARTIST")
        expect(result.data).to.not.equal(null)
    })
});

describe('findPosteosByType error', () => {
    it("find Posteos By Type error", async () => {
        const result = await dashboardService.findPosteosByType("", "", "")
        expect(result.data).to.equal(null)
    })
});

describe('find Users By Type success', () => {
    it("find Posteos By Type error", async () => {
        const result = await dashboardService.findUsersByType("637ed93275978ac8767a3748", "ARTIST")
        expect(result.exist).to.equal(true)
    })
});

describe('find Users By Type success', () => {
    it("find Posteos By Type error", async () => {
        const result = await dashboardService.findUsersByType("637ed93275978ac8767a3748", "")
        expect(result.exist).to.equal(false)
    })
});

describe('findUserByName success', () => {
    it("find User By Name success", async () => {
        const result = await dashboardService.findUserByName("Nicolas","","637ed93275978ac8767a3748")
        expect(result.data).to.not.equal(null)
    })
});

describe('findUserByName error', () => {
    it("find User By Name error", async () => {
        const result = await dashboardService.findUserByName("","","637ed93275978ac8767a3748")
        expect(result.exist).to.equal(false)
    })
});

describe('findUserByWord success', () => {
    it("find User By Word success", async () => {
        const result = await dashboardService.findUserByWord("", "nicolas", "", "", "")
        expect(result.exist).to.equal(true)
    })
});

describe('findUserByWord error', () => {
    it("find User By Word error", async () => {
        const result = await dashboardService.findUserByWord("", "", "", "", "asd")
        expect(result.exist).to.equal(true)
    })
});