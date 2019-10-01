/**
 * @file mofron-comp-tree/index.js
 * @brief tree component for mofron
 * @attention 'title' is private. please use 'index' or 'text' parameter instead of 'title'
 * @author simpart
 */
const mf = require("mofron");
const Text = require("mofron-comp-clktext");
const Switch = require("mofron-comp-clksw");
const Accordion = require("mofron-comp-accordion");
const evStyle = require("mofron-event-style");

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
            super.initDomConts();
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

            /* set margin-left event */
	    let sty_ev = (s1,s2,s3) => {
                try {
		    s1.leftConfig();
		} catch (e) {
		    console.error(e.stack);
		    throw e;
		}
	    }
	    this.event(new evStyle(sty_ev, "margin-left"));
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
	   this.leftConfig();
	   if ( (null !== this.clkconts()) &&
	        (undefined !== mf.objkey[this.clkconts()]) &&
	        ("none" !== mf.objkey[this.clkconts()].style("display")) ) {
               this.getRootTree().curconts(this.clkconts());
	   }
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
	    if (undefined !== prm) {
                prm.style({ "margin-left": "0.1rem" }, {loose:true});
		if (null !== prm.height()) {
                    this.title().height(prm.height());
		}
	    }
	    return this.innerComp("index", prm, mf.Component);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * same as index parameter
     * 
     * @param (mixed) string: tree index string
     *                mofron-comp-text: tree index text component
     * @return (mofron-comp-text) tree index component
     * @type parameter
     */
    text (prm) {
        try { return this.index(prm); } catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * tree text size
     * 
     * @param (string (size)) text size
     * @return (string (size)) text size
     * @type parameter
     */
    textSize (prm) {
        try {
	    if (undefined === prm) {
                /* getter */
		return this.member("textSize");
	    }
	    /* setter */
	    let thm = { "Text" : { fsize:prm } };
            this.theme(thm);
	    this.member("textSize", "object", thm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * click contents key
     * 
     * @param (string) display component of object key that when this tree is clicked.
     * @return (string) object key name
     * @type parameter
     */
    clkconts (prm) {
        try {
            return this.member("clkconts", "string", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * current contents key
     * 
     * @param (string) current display object key
     * @return (string) object key name
     * @type private
     */
    curconts (prm) {
        try {
            return this.member("curconts", "string", prm);
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
     * margin left config
     * 
     * @type private
     */
    leftConfig () {
        try {
            let chd = this.child();
            let mgn = (null === this.style("margin-left")) ? "0rem" : this.style("margin-left");
            let swm = this.switch().child()[0].width();
            if (null === swm) {
                swm = "0.1rem";
            } else if ("none" === this.switch().style("display")) {
                swm = "0rem";
	    }
            
            for (let cidx in chd) {
                chd[cidx].adom().style({
                    "margin-left" : mf.func.sizeSum(mgn, swm, "0.1rem")
                });
            }
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
	    /* check contents */
            if ( (null !== clk.clkconts()) && (undefined !== mf.objkey[clk.clkconts()]) ) {
                if ( (null !== root.curconts()) && (undefined !== mf.objkey[root.curconts()]) ) {
                    mf.objkey[root.curconts()].visible(
		        false,
                        () => {
                            try {
                                mf.objkey[clk.clkconts()].visible(true);
			    } catch (e) {
                                console.error(e.stack);
				throw e;
			    }
			}
		    );
		} else {
                    mf.objkey[clk.clkconts()].visible(true);
		}
		root.curconts(clk.clkconts());
	    }
            
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
}
module.exports = mf.comp.Tree;
/* end of file */
