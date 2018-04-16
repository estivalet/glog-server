var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MachineSchema = new Schema(
  {
    name: {type: String},
    sourcefile: {type: String},
    isbios: {type: String},
    isdevice: {type: String},
    ismechanical: {type: String},
    runnable: {type: String},
    cloneof: {type: String},
    romof: {type: String},
    sampleof: {type: String},
    description: {type: String},
    year: {type: String},
    manufacturer: {type: String},
    category: {type: String},
    info: {type: String},
    veradded: {type: String},
    history: {type: String},
    biosset: [{
        name: {type: String},
        description: {type: String},
        _default: {type: String},
    }],
    rom: [{
        name: {type: String},
        bios: {type: String},
        size: {type: String},
        crc: {type: String},
        sha1: {type: String},
        merge: {type: String},
        region: {type: String},
        offset: {type: String},
        status: {type: String},
        optional: {type: String},
    }],
    disk: [{
        name: {type: String},
        sha1: {type: String},
        merge: {type: String},
        region: {type: String},
        index: {type: String},
        writable: {type: String},
        status: {type: String},
        optional: {type: String},
    }],
    deviceref: [{
        name: {type: String},
    }],
    sample: [{
        name: {type: String},
    }],
    chip: [{
        name: {type: String},
        tag: {type: String},
        type: {type: String},
        clock: {type: String},
    }],
    display: [{
        tag: {type: String},
        type: {type: String},
        rotate: {type: String},
        flipx: {type: String},
        width: {type: String},
        height: {type: String},
        refresh: {type: String},
        pixclock: {type: String},
        htotal: {type: String},
        hbend: {type: String},
        hbstart: {type: String},
        vtotal: {type: String},
        vbend: {type: String},
        vbstart: {type: String},
    }],
    sound: [{
        channels: {type:String},
        condition: [{
            tag: {type:String},
            mask: {type:String},
            relation: {type:String},
            value: {type:String},
        }]
    }],
    input: [{
        service: {type:String},
        tilt: {type:String},
        players: {type:String},
        coins: {type: String},
        control: [{
            type: {type: String},
            player: {type: String},
            buttons: {type: String},
            reqbuttons: {type: String},
            minimum: {type: String},
            maximum: {type: String},
            sensitivity: {type: String},
            keydelta: {type: String},
            reverse: {type: String},
            ways: {type: String},
            ways2: {type: String},
            ways3: {type: String},
        }]
    }],
    dipswitch: [{
        name: {type: String},
        tag: {type: String},
        mask: {type: String},
        diplocation: [{
            name: {type: String},
            number: {type: String},
            inverted: {type: String},
        }],
        dipvalue: [{
            name: {type: String},
            value: {type: String},
            _default: {type: String},
        }]
    }],
    configuration: [{
        name: {type: String},
        tag: {type: String},
        mask: {type: String},
        conflocation: [{
            name: {type: String},
            number: {type: String},
            inverted: {type: String},
        }],
        confsetting: [{
            name: {type: String},
            value: {type: String},
            _default: {type: String},
        }]
    }],
    port: [{
        tag: {type: String},
        analog: [{
            mask: {type: String},
        }]

    }],
    adjuster: [{
        name: {type: String},
        _default: {type: String},
    }],
    driver: {
        status: {type: String},
        emulation: {type: String},
        cocktail: {type: String},
        savestate: {type: String},
    },
    feature: [{
        type: {type: String},
        status: {type: String},
        overall: {type: String},
    }],
    device: [{
        type: {type: String},
        tag: {type: String},
        fixed_image: {type: String},
        mandatory: {type: String},
        interface: {type: String},
        instance: [{
            name: {type: String},
            briefname: {type: String},
        }],
        extension: [{
            name: {type: String},
        }]
    }],
    slot: [{
        name: {type: String},
        slotoption: [{
            name: {type: String},
            devname: {type: String},
            _default: {type: String},
        }]
    }],
    softwarelist: [{
        name: {type: String},
        status: {type: String},
        filter: {type: String},
    }],
    ramoption: [{
        _default: {type: String},
    }]
  }
);

MachineSchema.virtual('title').get(function () {
    return this.description.substring(0, this.description.indexOf(' ('));
});


//Export model
module.exports = mongoose.model('Machine', MachineSchema);