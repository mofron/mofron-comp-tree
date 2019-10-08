/**
 * @file mofron-comp-tree/index.js
 * @brief tree component for mofron
 * @author simpart
 */
const mf = require("mofron");
const Text = require("mofron-comp-clktext");
const Switch = require("mofron-comp-clksw");
const Accordion = require("mofron-comp-accordion");
const evStyle = require("mofron-event-style");
const SyncHei = require('mofron-effect-synchei');

mf.comp.Tree = class extends Accordion {
    /**
     * initialize component
     * 
     * @param (mixed) mofron-comp-tree: tree contents
     *                object: component option
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name('Tree');
	    this.prmMap("index");
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
	    this.adom().addChild(new mf.Dom('div', this));
	    
            this.switch(
                new Switch([
                    new Text({ text: "-", width: "0.1rem" }),
                    new Text({ text: "+", width: "0.1rem" })
                ])
	    );
            this.title(
                new mf.Component({
                    child: [ this.switch(), this.index() ],
                    style: { "display" : "flex" },
                })
	    );
            
	    let twrp = new mf.Component({
                style: { "display" : "flex" },
		child: this.title()
	    });
            this.child([twrp, this.contents()]);
	    this.target(this.contents().target());
            this.styleTgt(this.target());

	    /* set folding change event */
	    let chg_ev = (c1,c2,c3) => {
                try {
                    if ( (true === c2) && (0 === c3.switch().index()) ) {
                        c3.switch().switching(1);
		    } else if ( (false === c2) && (1 === c3.switch().index()) ) {
                        c3.switch().switching(0);
		    }
		    c3.notifyClick(c3);
		} catch (e) {
                    console.error(e.stack);
		    throw e;
		}
	    }
	    this.changeEvent(chg_ev,this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * switch config,left position
     *
     * @type private
     */
    beforeRender () {
        try {
           super.beforeRender();
           
	   /* set switch visible */
           if (0 === this.child().length) {
               this.switch().visible(false);
	   }

           /* set margin-left config */
           let chd = this.child();
           for (let cidx in chd) {
               chd[cidx].adom().style({ "margin-left" : "0.2rem" });
           }
           if (0 < chd.length) {
               this.index().adom().style({ "margin-left" : "0.1rem" });
           }
	   
	   /* set default height */
	   let hei = null;
	   if (undefined === this.option().height) {
	       for (let cidx2 in chd) {
	           hei = mf.func.sizeSum(hei, chd[cidx2].height());
	       }
	       this.height(hei);
	   }
	} catch (e) {
	    console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * tree text
     * 
     * @param (mixed) string: tree text
     *                component: tree text component
     * @return (component) tree text component
     * @type parameter
     */
    title (prm) {
        try {
	    if ("string" === typeof prm) {
                this.index(prm);
		return;
	    }
            return super.title(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * tree index text
     * 
     * @param (mixed) string: tree index string
     *                mofron-comp-text: tree index text component
     * @return (mofron-comp-text) tree index component
     * @type parameter
     */
    index (prm) {
        try {
	    if ("string" === typeof prm) {
                prm = new Text(prm);
	    }
	    return this.innerComp("index", prm, mf.Component);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * title height
     * 
     * @param (string (size)) title height
     * @param (string (size)) element title height
     * @return (array) [title height, element title height]
     * @type parameter
     */
    ttlhei (prm, elm) {
        try {
            if ( (undefined === prm) && (undefined === elm) ) {
                /* getter */
		return [ this.index().height(), this.elmhei() ];
	    }
            /* setter */
	    this.switch().height(prm);
            this.index().height(prm);
	    this.elmhei(elm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * element title height
     * 
     * @param (string (size)) element title height
     * @return (string (size)) element title height
     * @type parameter
     */
    elmhei (prm) {
        try {
            if (undefined === prm) {
                /* getter */
		return (0 === this.child().length) ? null : this.child()[0].index().height();
	    }
	    /* setter */
	    let chd = this.child();
            for (let cidx in chd) {
                if (true === mf.func.isInclude(chd[cidx],"Tree")) {
                    chd[cidx].ttlhei(prm);
                }
            }
	} catch (e) {
	    console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * switch component
     * 
     * @param (mofron-comp-switch) switch component
     * @return (mofron-comp-switch) switch component
     * @type parameter
     */
    switch (prm) {
        try {
            return this.innerComp("switch", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * get root tree component
     * 
     * @return (mofron-comp-tree) root tree component
     * @type function
     */
    getRootTree () {
        try {
            let ret = this;  // for root tree check
            while (null !== ret) {
                if (true === mf.func.isInclude(ret,"Tree")) {
                    if (true === mf.func.isInclude(ret.parent(),"Tree")) {
		        ret = ret.parent();
                        continue;
                    } else {
                        break;
                    }
                } else {
                    throw new Error("could not find root tree");
                }
            }
	    return ret;
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * notify click event
     * 
     * @param (mofron-comp-tree) clicked tree elements
     * @type private
     */
    notifyClick (clk) {
        try {
            let root = this.getRootTree();
	    /* execute click event */
	    let evt = root.clickEvent();
	    for (let eidx in evt) {
                evt[eidx][0](root, clk, evt[eidx][1]);
	    }
	} catch (e) {
	    console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * click event
     * 
     * @param (function) function for click event
     * @param (mixed) function parameter
     * @type parameter
     */
    clickEvent (fnc, prm) {
        try {
	    if ((undefined !== fnc) && ('function' !== typeof fnc)) {
                throw new Error('invalid parameter');
	    }
            return this.arrayMember(
	        "clickEvent",
		"object",
		(undefined === fnc) ? undefined : [fnc,prm]
            );
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * folding speed
     * 
     * @param (number) folding speed (millisecond)
     * @return (number) folding speed
     * @type parameter
     */
    speed (prm) {
        try {
	    let ret = super.speed(prm);
            if (undefined !== prm) {
                let chd = this.child();
		for (let cidx in chd) {
                    if (true === mf.func.isInclude(chd[cidx],"Tree")) {
		        chd[cidx].speed(prm);
		    }
		}
	    }
	    return ret;
	} catch (e) {
	    console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * tree height
     * 
     * @param (string (size)) tree height
     * @param (object) option
     * @return (string (size)) tree height
     * @type parameter
     */
    height (prm, opt) {
        try {
            if (undefined === prm) {
                /* getter */
		return mf.func.sizeSum(this.index().height(), super.height());
	    }
	    /* setter */
	    super.height(prm, opt);
	} catch (e) {
	    console.error(e.stack);
	    throw e;
	}
    }
}
module.exports = mf.comp.Tree;
/* end of file */
